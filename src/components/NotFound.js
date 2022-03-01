import Error from "./Error";

const NotFound = () => {
    return ( 
        <Error code={'404'} msg1={'想前往的頁面不存在，'} msg2={'確認有沒有打錯！'}/>
     );
}
 
export default NotFound;