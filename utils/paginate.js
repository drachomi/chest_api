module.exports = {
    
    paginate:(data,limit,page)=>{
       console.log('called me paginate')
       totalPages = Math.ceil(data.length/limit) 
       result = data.slice((page - 1)*limit, page*limit)
       //console.log({result,totalPages})
       return result
    } 


}