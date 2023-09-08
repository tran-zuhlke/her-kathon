import React from "react"
import {GetServerSideProps} from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
    const res = await fetch(baseUrl + '/api/post', {
      method: 'GET'
    });
    const feed = await res.json()
    return {
      props: { feed }
    }
  } catch (error) {
    console.error(error);
  }

}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
