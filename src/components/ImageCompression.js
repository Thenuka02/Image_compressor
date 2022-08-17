import { useState } from "react";

import {  Image, Item } from "semantic-ui-react";

//import { Container, Grid, Item, Button }  from '@mui/material';
//import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import imageCompression from "browser-image-compression";

const useStyles = makeStyles((theme) => ({
    link: {
      color: "#9FA2B4",
      backgroundColor: "#363740" ,
    },
    
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

    <div className="App">
      <Container>

      <Item >
            {orignImageFile ? (

                <Image src={orignImageFile}></Image>

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

            </Item>

            <input className={classes.link}
                id= "Upload File"
                type="file"
                accept="image/*"
                onChange={(e) => handle(e)}
            /> 

       
           
              <Button  sx={{ color: '#FFFFFF', backgroundColor: '#29CC97', borderRadius: "4px" , ml:10,}}
                onClick={(e) => {
                  handleCompressImage(e);
                }}
              >
                Compress 
              </Button>

            {compressedImage && (

              <Button >

                <a href={compressedImage} download={fileName}>
                  Download 

                </a>

              </Button>

            )}

       
            <Item>

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
            </Item>
                    
       
      </Container>

    </div>

  );

}



export default ImageCompression;
