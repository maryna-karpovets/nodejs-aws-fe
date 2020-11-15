import React, { ChangeEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 0, 3),
  },
}));

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const classes = useStyles();
  const [file, setFile] = useState<File | null>();

  const onFileChange = (event: ChangeEvent<HTMLInputElement> | DragEvent) => {
    let files =
      (event as ChangeEvent<HTMLInputElement>).target.files ||
      (event as DragEvent).dataTransfer?.files;

    if (!files?.length) {
      return;
    }

    setFile(files.item(0));
  };

  const removeFile = () => {
    setFile(null);
  };

  const uploadFile = async () => {
    const response = await axios({
      method: 'GET',
      url,
      params: {
        name: encodeURIComponent(file?.name!),
      },
    });

    console.log('File to upload: ', file?.name!);
    console.log('Uploading to: ', response.data);

    const result = await fetch(response.data, {
      method: 'PUT',
      body: file,
    });

    console.log('Result: ', result);

    setFile(null);
  };

  return (
    <div className={classes.content}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </div>
  );
}
