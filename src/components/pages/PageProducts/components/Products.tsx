import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link } from '@material-ui/core';

import { Product } from 'models/Product';
import { formatAsPrice } from 'utils/utils';
import AddProductToCart from 'components/AddProductToCart/AddProductToCart';
import API_PATHS from 'constants/apiPaths';

const useStyles = makeStyles(theme => ({
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Products() {
  const classes = useStyles();
  const [products, setProducts] = useState<Product[]>([]);
  const { hash } = useLocation();

  useEffect(() => {
    // TODO: remove headers after task 7 is checked
    const token = hash.split('#id_token=')[1]?.split('&access_token')[0];

    axios
      .get(`${API_PATHS.product}/products`, {
        ...(token && {
          headers: {
            Authorization: token,
          },
        }),
      })
      .then(res => setProducts(res.data));
  }, [hash]);

  if (!products.length) {
    return (
      <Box component="div" display="block" flex={1} fontWeight="fontWeightBold">
        <Typography variant="h6" align="center">
          Please save an id token to get access to the products. Login: test, password: test123.
        </Typography>
        <Typography variant="subtitle1" align="center">
          <Link
            href="https://user-pool-domain.auth.eu-west-1.amazoncognito.com/login?client_id=18q5ckfo9jfhj9nn41equlkfko&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://d2kdkgfbzg2dbv.cloudfront.net/"
            target="_blank"
            style={{ paddingLeft: '10px' }}
          >
            Click to login and get an id token
          </Link>
        </Typography>
      </Box>
    );

    // TODO: revert after task 7 is checked
    // return (
    //   <div className={classes.loader}>
    //     <CircularProgress size={50} />
    //   </div>
    // );
  }

  return (
    <Grid container spacing={4}>
      {products.map((product: Product, index: number) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.image_url}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography>{formatAsPrice(product.price)}</Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart product={product} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
