import React from "react"
import {GetServerSideProps} from "next"
import {Button} from "reactstrap";
import {PiUmbrellaDuotone} from "react-icons/pi";
import 'bootstrap/dist/css/bootstrap.css';
import moment from "moment";
import {platform} from "os";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
    const res = await fetch(baseUrl + '/api/live', {
      method: 'GET'
    });
    const data = await res.json()
    data.totalDuration = moment.utc(data.totalTime).format('HH:mm');
    data.platformData.forEach(platform => {
      platform.duration = moment.utc(platform.liveTime).format('HH:mm');
    })
    return {
      props: { data }
    }
  } catch (error) {
    console.error(error);
  }

}

type Props = {
  data: LiveProps
}

export type PlatFormDataProps = {
  duration: string | null;
  liveTime: number;
  deals: number;
  brand: string ;
  platform: string ;
}

export type LiveProps = {
  totalDuration: string | null;
  totalTime: number;
  totalView: number;
  brands: string[];
  customerData: {
    location: string;
    malePercent: number;
    femalePercent: number;
  }
  platformData: PlatFormDataProps[]
};

const LivePopup: React.FC<Props> = (props) => {
  return (
    <div>
      <div className='popup-background'>
        <div className='popup-container white-border'>
          <h2 className='text-center'>Phiên LIVE đã kết thúc</h2>
          <p className='text-center' style={{color: 'rgb(142 142 142)'}}>{moment(new Date()).format('hh:mm A, DD/MM/YYYY')} | Được phát trực tuyến trong {props.data.totalDuration}</p>
          <br/>
          <div className='d-flex flex-column gap-4'>
            {props.data.platformData.map(platformData =>
                <div key={platformData.platform} className='live-summary-container'>
                  <div className='platform-logo-container'>
                    <div className='platform-logo' style={{backgroundImage: `url("logo-${platformData.platform.toLowerCase()}.png")`}}></div>
                  </div>
                  <div className='platform-data-container'>
                    <div className='d-flex gap-4 justify-content-between'>
                      <strong style={{margin: 'auto 0'}}>Bạn đang làm rất tốt! Hãy tiếp tục phát huy nhé!</strong>
                      <Button style={{background: 'rgb(61,61,61)', whiteSpace: 'nowrap'}}>Xem phân tích</Button>
                    </div>
                    <hr style={{borderTop: '1px dashed'}}/>
                    <div className='d-flex justify-content-between gap-3'>
                      <div>Thời gian live<br/><b>{platformData.duration}</b></div>
                      <div>Số đơn<br/><b>{platformData.deals}</b></div>
                      <div>Brand<br/><b>{platformData.brand}</b></div>
                      <div>Platform<br/><b>{platformData.platform}</b></div>
                    </div>
                  </div>
                </div>
            )}
            <div className='live-summary-container'>
              <div className='platform-logo-container'><PiUmbrellaDuotone size={120}/></div>
              <div className='platform-data-container'>
                <div className='d-flex gap-4 justify-content-between'>
                  <strong style={{margin: 'auto 0'}}>Bạn đang làm rất tốt! Hãy tiếp tục phát huy nhé!</strong>
                  <Button style={{background: 'rgb(61,61,61)', whiteSpace: 'nowrap'}}>Xem phân tích</Button>
                </div>
                <hr style={{borderTop: '1px dashed'}}/>
                <div className='d-flex gap-3'>
                  <div>Tổng thời gian live<br/><b>{props.data.totalDuration}</b></div>
                  <div>Tổng số view<br/><b>{props.data.totalView.toLocaleString()}</b></div>
                </div>
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
          margin: 100px 0;
          height: fit-content;
          padding: 36px 24px;
          background-color: rgb(37, 37, 37);
          border-radius: 16px;
          box-shadow: 10px 10px 5px rgb(37, 37, 37);
        }
        .live-summary-container {
          padding: 16px;
          display: flex;
          gap: 16px;
          border: rgb(63,63,63) solid 1px;
          border-radius: 8px;
          background-color: rgb(45, 45, 45);
        }
        .platform-logo-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 24px;
        }
        .platform-logo {
          width: 120px;
          height: 120px;
          background-position: center;
          background-size: cover;
        }
        .platform-data-container {
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

export default LivePopup
