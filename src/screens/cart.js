import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';



const BASE_URL = 'https://raw.githubusercon tent.com/sdras/sample-vue-shop/master/dist';

const products = [
  {
    name: 'Khaki Suede Polish Work Boots',
    price: 149.99,
    img: `./Screenshot.png`
  },
  {
    name: 'Camo Fang Backpack Jungle',
    price: 39.99,
    img: `${BASE_URL}/jacket1.png`
  },
  {
    name: 'Parka and Quilted Liner Jacket',
    price: 49.99,
    img: `${BASE_URL}/jacket2.png`
  },
  {
    name: 'Cotton Black Cap',
    price: 12.99,
    img: `${BASE_URL}/hat1.png`
  },
];

export default class HomeScreen extends React.Component {
    render() {
      return (
        <ScrollView
          style={{
            flexGrow: 0,
            width: "100%",
            height: "100%",
          }}>
          {
            products.map((product, index) => {
              return(
                <>
                <View style={styles.row} key={index}>
                    <View style={styles.col}>
                      <Product/>
                    </View>
                </View>
                 <View style={styles.row} key={index}>
                 <View style={styles.col}>
                   <Product/>
                 </View>
             </View>
                </>
              )
            }
            )
          }
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  col: {
      flex: 1,
  },
});
