    import multer from 'multer';
    import path from "path";


    const storage =multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(process.cwd(),"uploads"));
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+'-'+file.originalname);
        }
    });
    const upload =multer({storage})
    const uploadMdw = upload.array('images',5);


    export default uploadMdw;