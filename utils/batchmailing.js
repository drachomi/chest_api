
//not tested yet
function batchMail(arr,percycle,functionToExecute,message,subject){
    let length = arr.length
    let cycletogo = Math.ceil(length/percycle) 
    let res = []
    for(i=0;i<=cycletogo;i++){
        let active_array =  arr.slice(i*(percycle),(percycle)*(1+i))
        functionToExecute(currentArray,message,subject)
             
    }
    return res
    } 