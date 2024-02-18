import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";

function Footer(props) {
  
  const devList = [
    {
      name: "imchommiii",
      url: "#"
    },
    {
      name: "nok_poko",
      url: "#"
    },
    {
      name: "NOthiNg",
      url: "#"
    },
    {
      name: "cjkaiang",
      url: "#"
    }
  ];

  return (
    <div className='flex flex-col text-center w-full'>
      <div className='w-9/12 mx-auto my-5'>
        <hr />
      </div>
      <div className='text-md'>
        Copyright © 2023 - {new Date().getFullYear()}, All right reserved
      </div>
      <div className='text-md'>
        กลุ่มโปรเจค : กล่องยาเเจ้งเตือน
      </div>
      <div className='text-md'>
        Made with ❤️ by 
      </div>
      <div className='text-md'>
        {devList.map((info, i) =>(
          <span key={i}>
            <a className='font-thin text-gray-500' href={info.url}>
              {info.name}
            </a> &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export default Footer;