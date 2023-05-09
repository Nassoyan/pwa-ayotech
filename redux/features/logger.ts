// import Cookies from "js-cookie";


// // A mock function to mimic making an async request for data
// export default  function fetchCount({ method, url, body }:any) {
//   const configureBody = {};
//   if(!method){
//     throw Error
//   }else {
//     configureBody.method = method
//     if (method === "POST"){
//       configureBody.body = JSON.stringify(body)
//     }
//   }

//   configureBody.headers = {
//     "Accept": "application/json",
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//     "Authorization": `Bearer ${Cookies.get("authorized")}`,
//   }



// return new Promise(async (resolve, reject) =>{
//   const response = await fetch(
//     url,
//     configureBody
//     );
//     if (response?.ok) {
//       try {
//         const result = await response.clone().json();
//         resolve(result);
//       } catch (error) {
//         const result = await response.text();
//         resolve(result);
//       }
//     } else {
//       const result = await response.json();
//       reject({ result, status: response.status });
//     }
// } )
// }



//this is typescript version of logger function
import Cookies from "js-cookie";

interface RequestBody {
  [key: string]: any;
}

interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: RequestBody;
  url: string;

}

interface RequestConfig {
  method: RequestOptions['method'];
  headers: {
    "Accept": string;
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    "Authorization": string;
  };
  body?: string;
}

export default function fetchCount({ method, url, body }: RequestOptions) {
  const configureBody: RequestConfig = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${Cookies.get("authorized")}`,
    }
  };

  if (method === "POST" && body) {
    configureBody.body = JSON.stringify(body)
  }

  return new Promise(async (resolve, reject) => {
    const response = await fetch(url, configureBody);

    if (response?.ok) {
      try {
        const result = await response.clone().json();
        resolve(result);
      } catch (error) {
        const result = await response.text();
        resolve(result);
      }
    } else {
      const result = await response.json();
      reject({ result, status: response.status });
    }
  })
}
//this is typescript version of logger function
