// import React from 'react'
// import { useState, useEffect } from "react"

// //https://itnext.io/how-to-create-a-react-hook-to-make-ajax-calls-5d5052e08269
// const queryString = params =>
//   Object.keys(params)
//     .map(key => `${key}=${params[key]}`)
//     .join("&")

// const createUrl = (url, queryOptions) => {
//   return url + "?" + queryString(queryOptions)
// }

// export default function ArticleAPI() {

//     export default (url, options = { body: {}, query: {}}) => {
//         const [data, setData] = useState({
//             //Contain the JSON response of the API called
//             response: null,

//             //in the case the response status is not ok
//             error: false,

//             //True if hook is still fetching request
//             loading: true,
//         });

//         //DO something only when the params change (query, options, url)
//         useEffect(() => {
//             setData({ ...data, error: null, loading: true});
//             fetch(createUrl(url, options.query),{
//                 method: options.method || "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: options.method != "GET" && JSON.stringify(options.body),
//             })
//             .then(async (response)=> {
//                 const data = await response.json();
//                 setData({
//                     response: data,
//                     error: !response.ok,
//                     loading: false,
//                 });
//             })
//             .catch((error)=>{
//                 setData({
//                     response: {status: "network_failure" },
//                     error: true,
//                     loading: false,
//                 });
//             });//return a string of our options values
//         }, [url, JSON.stringify(options)]);

//         return data;
//     };

//       componentDidMount() {
//         fetch('/api/sentiments')
//           .then(res => res.json())
//           .then(sentiments => this.setState({sentiments}, () => console.log('Sentiment Collected ...', sentiments)));
//       }

//     return (
//         <div>
            
//         </div>
//     )
// }
