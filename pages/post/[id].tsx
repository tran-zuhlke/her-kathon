import React from "react"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
import {GetServerSideProps} from "next";

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    try {
        const protocol = req.headers['x-forwarded-proto'] || 'http'
        const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
        const res = await fetch(baseUrl + '/api/post/' + params?.id, {
            method: 'GET'
        });
        const post = await res.json()
        return {
            props: { ...post }
        }
    } catch (error) {
        console.error(error);
    }
};
const Post: React.FC<PostProps> = (props) => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown children={props.content} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
