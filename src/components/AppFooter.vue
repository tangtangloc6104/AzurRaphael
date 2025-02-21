<template>
    <footer>
         <div class="footer-container">
             <div class="footer-column">
                 <h3>Đây là trang web bán quần áo </h3>
                 <p>Mọi chi tiết xin hãy liên hệ cho Lộc!</p>
             </div>
             <div class="footer-column">
                 <h3>Danh sách</h3>
                 <ul>
                    <li><a href="/nam"> Nam </a></li>
                    <li><a href="/nu"> Nữ </a></li>
                    <li><a href="/lamdep"> Làm đẹp </a></li>
                    <li><a href="/phukien"> Phụ kiện </a></li>
                    <li><a href="/lienhe"> Liên hệ </a></li>
                    <li><a href="/tintuc"> Tin tức </a></li>
                 </ul>
             </div>
             <div class="footer-column">
                 <h3>Tăng Gia Lộc</h3>
                 <p>MSSV: 22150212</p>
                 <p>Lớp: 221404</p>
             </div>
         </div>
     </footer>
 </template>
 
 <script>
 export default {
 
 }
 </script>
 
 <style>
 footer {
     background-color: #d2cece;
     color: #393737;
     padding: 20px;
 }
 
 .footer-container {
     display: flex;
     justify-content: space-between;
     flex-wrap: wrap;
     max-width: 1200px;
     margin: 0 auto;
 }
 
 .footer-column {
     flex: 1;
     padding: 10px;
     min-width: 200px;
     box-sizing: border-box;
 }
 
 .footer-column h3 {
     margin-top: 0;
 }
 

 .footer-column a {
     color: black;
     text-decoration: none;
 }
 
 .footer-column a:hover {
     text-decoration: underline;
 }
 </style>