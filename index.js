const io=require('socket.io')(3000);


const arrUserInfo=[];


io.on('connection',socket=>{

    socket.on('NGUOI_DUNG_DANG_KY',user=>{

        //check username đã đăng ký
        const isExist=arrUserInfo.some(e=>e.ten==user.ten);
        if(isExist){
            socket.emit('DANG_KY_THAT_BAI');
            return;
        }

         socket.peerID=user.peerID;


        arrUserInfo.push(user);
        console.log(arrUserInfo);
        socket.emit('DANH_SACH_ONLINE',arrUserInfo);
        socket.broadcast.emit('CO_NGUOI_DUNG_MOI',user);

    });

    socket.on('disconnect',()=>{
        const index = arrUserInfo.findIndex(user=>user.peerID===socket.peerID);
        console.log(index);

        arrUserInfo.splice(index,1);

        io.emit('AI_DO_NGAT_KET_NOI',socket.peerID);

    });

});