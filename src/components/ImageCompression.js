import { useState } from "react";

import {  Image } from "semantic-ui-react";

//import { Container, Grid, Item, Button }  from '@mui/material';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import imageCompression from "browser-image-compression";

const useStyles = makeStyles((theme) => ({
    link: {
      color: "#9FA2B4",
      backgroundColor: "#363740" ,
      display:"fixed",
    },
    download: {
      textDecoration: "none" ,
      color: '#FFFFFF',
      display:"fixed",
    },
    background: {
      backgroundColor: "#4169E1" ,
      height: '100vh' ,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minWidth: '100%',
      minHeight: "100%",
      position: 'fixed',
     // display: 'flex',
    }
  }));  


const ImageCompression = () =>{
  const [orignImage, setOrignImage] = useState("");

  const [orignImageFile, setOrignImageFile] = useState("");

  const [compressedImage, setCompressedImage] = useState("");

  const [fileName, setFileName] = useState("");

  const classes = useStyles();

  const handle = (e) => {

    const imageFile = e.target.files[0];

    setOrignImage(imageFile);

    setOrignImageFile(URL.createObjectURL(imageFile));

    setFileName(imageFile.name);

  };



  const handleCompressImage = (e) => {

    e.preventDefault();

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };

    let output;

    imageCompression(orignImage, options).then((x) => {

      output = x;

      const downloadLink = URL.createObjectURL(output);

      setCompressedImage(downloadLink);

    });

  };

  return (

    <div className={classes.background}>
      
      <Grid container spacing={1} sx={{ mt: 5 , ml:5}}>
  
      <Grid item xs={12} sm={6} md={3} >
            {orignImageFile ? (

                <Image src={orignImageFile}></Image>

              ) : (

                <Box sx={{
                    width: 300,
                    height: 300,
                    display:"fixed",
                    backgroundColor: '#9FA2B4',
                    '&:hover': {
                      backgroundColor: '#363740',
                      opacity: [0.9, 0.8, 0.7],
                    },
                  }} />
                  
                )}
                <Grid item xs={12} md={6} lg={6} >
                <input className={classes.link}
                    id= "Upload File"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handle(e)}
                /> 
                </Grid>
                {/* <Grid item xs={12} md={6} lg={6} >
                <Button  
                  sx={{ color: '#FFFFFF', backgroundColor: '#006400',
                  borderRadius: "4px" , display:"fixed", alignItems: "center",
                      '&:hover': {
                        backgroundColor: '#2E8B57',
                        opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    
                  onClick={(e) => {
                    handleCompressImage(e);
                  }}
                >
                  Compress 
                </Button>
                  </Grid>   */}
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                <Button  
                  sx={{ color: '#FFFFFF', backgroundColor: '#006400',
                  borderRadius: "4px" , display:"fixed", alignItems: "center", ml:10,
                      '&:hover': {
                        backgroundColor: '#2E8B57',
                        opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    
                  onClick={(e) => {
                    handleCompressImage(e);
                  }}
                >
                  Compress 
                </Button>
                  </Grid>  
       
            <Grid item xs={12} sm={6} md={3}>

            {compressedImage ? (

            <Image src={compressedImage}></Image>

            ) : (
            <Box sx={{
             
                width: 300,
                height: 300,
                backgroundColor: '#9FA2B4',
                '&:hover': {
                backgroundColor: '#363740',
                opacity: [0.9, 0.8, 0.7],
                },
            }} />
            )}
             
            {compressedImage && (

            <Button sx={{ textDecoration: "none" ,color: '#FFFFFF', 
            backgroundColor: '#9F2B68', borderRadius: "4px" , 
            display:"fixed",
            '&:hover': {
            backgroundColor: '#BF40BF',
            opacity: [0.9, 0.8, 0.7],
            },
            }}

            >

            <a  className={classes.download}  download={fileName}>
              Download 

            </a>

            </Button>

            )}     
        </Grid> 
       </Grid>
      
    </div>

  );

}

export default ImageCompression;
