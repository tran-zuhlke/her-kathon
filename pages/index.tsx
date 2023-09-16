import React from "react"
import {GetServerSideProps} from "next"
import { PostProps } from "../components/Post"
import {Button} from "reactstrap";
import {PiUmbrellaDuotone} from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.css';

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
    <div>
      <div className='popup-background'>
        <div className='popup-container white-border'>
          <h2 className='text-center'>Phiên LIVE đã kết thúc</h2>
          <p className='text-center' style={{color: 'rgb(142 142 142)'}}>Tháng 9 16 19:00 | Được phát trực tuyến 33 giây</p>
          <br/>
          <div className='content-container'>
            <div className='content-1-container'><PiUmbrellaDuotone size={120}/></div>
            <div className='content-2-container'>
              <div className='d-flex gap-4 justify-content-between'>
                <strong style={{margin: 'auto 0'}}>Bạn đang làm rất tốt! Hãy tiếp tục phát huy nhé!</strong>
                <Button style={{background: 'rgb(61,61,61)', whiteSpace: 'nowrap'}}>Xem phan tich</Button>
              </div>
              <hr style={{borderTop: '1px dashed'}}/>
              <div className='d-flex gap-3'>
                <div>Tổng số lượt xem<br/><b>1</b></div>
                <div>Kim cương<br/><b>1</b></div>
                <div>Flowwer mới<br/><b>1</b></div>
                <div>Người gửi quà tặng<br/><b>1</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .popup-background {
          min-height: 100vh;
          min-width: 100vh;
          background-color: rgb(81, 81, 81);
          display: flex;
          justify-content: center;
          
        }
        .popup-container {
          width: 700px;
          margin-top: 200px;
          height: fit-content;
          max-height: 400px;
          padding: 36px 24px;
          background-color: rgb(37, 37, 37);
          border-radius: 16px;
          box-shadow: 10px 10px 5px rgb(37, 37, 37);
        }
        .content-container {
          padding: 16px;
          display: flex;
          gap: 16px;
          border: rgb(63,63,63) solid 1px;
          border-radius: 8px;
          background-color: rgb(45, 45, 45);
        }
        .content-1-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px;
          transform: rotate(-36deg);
        }
        .content-2-container {
          width: 100%;
          flex-basis: auto;
        }
        
        * {
          color: rgb(231,231,231);
        }

        .text-center {
          text-align: center;
        }
        
        .white-border {
          border: rgb(63,63,63) solid 1px;
        }
      `}</style>
    </div>
  )
}

export default Blog
