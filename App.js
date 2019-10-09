import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const ConversionTypeButton = (props) => {
  console.log(props.from  + ' ___ '+ props.toCurrency + ' to '+ props.to)
  console.log(props.from && props.toCurrency)
  const backgroundColor =
    props.fromCurrency === props.from && props.toCurrency === props.to
      ? 'lightblue'
      : null;
  const buttonStyle = { backgroundColor: backgroundColor };

  const fromFlag = props.from === 'usd' ? '🇺🇸' : '🇻🇳';
  const toFlag = props.to === 'usd' ? '🇺🇸' : '🇻🇳';

  var { button, buttonText } = styles

  

  return (
    <TouchableOpacity style={[button .buttonStyle]}
      onPress={() => props.setConversionCurrencies(props.from , props.to)}>
      <Text style={buttonText}>
        {fromFlag} to {toFlag}
      </Text>
    </TouchableOpacity>
  );
};

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCurrencyValue: 0,
      convertedCurrencyValue: 0,
      fromCurrency: 'vnd',
      toCurrency: 'usd',
    }
  }

  numberFormat = (value , currency) => {
    return new Intl.NumberFormat('en', {
          style: 'currency',
          currency: currency
        }).format(value);
  }
   

  setConversionCurrencies = (from, to) => {
    this.setState({
      fromCurrency: from,
      toCurrency: to
    }, () => this.setFromCurrencyValue(this.state.currentCurrencyValue))
  }

  setFromCurrencyValue = (value) => {
    let convertedValue;
    if (this.state.fromCurrency === 'vnd') {
      convertedValue = value / 23000;
    } else {
      convertedValue = 23000 * value;
    }

    this.setState({ currentCurrencyValue: value, convertedCurrencyValue: convertedValue })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Please enter the value of the currency you want to convert</Text>
        <TextInput
          style={{
            height: 60,
            padding: 5,
            width: 300,
            fontSize: 35,
            borderWidth: 1,
            borderColor: 'lightblue'
          }}
          keyboardType="number-pad"
          autoFocus={true}
          textAlign="center"
          placeholder="100,000,000 VND"
          selectionColor="red"
          onChangeText={this.setFromCurrencyValue}
        />
        <ConversionTypeButton
          from="vnd"
          fromCurrency={this.state.fromCurrency}
          to="usd"
          toCurrency={this.state.toCurrency}
          setConversionCurrencies={this.setConversionCurrencies}
        />
        <ConversionTypeButton
          from="usd"
          to="vnd"
          toCurrency={this.state.toCurrency}
          fromCurrency={this.state.fromCurrency}
          setConversionCurrencies={this.setConversionCurrencies}
        />

        <Text>Current currency:</Text>
        <Text style={styles.currencyText}>{this.numberFormat(this.state.currentCurrencyValue , this.state.fromCurrency)}</Text>
        <Text>Conversion currenecy:</Text>
        <Text style={styles.currencyText}>{this.numberFormat(this.state.convertedCurrencyValue , this.state.toCurrency)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  button: {
    height: 35,
    width: 200,
    margin: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    borderColor: 'lightblue',
    justifyContent: 'center'
  },
  currencyText: {
    fontSize: 30,
    color: 'green',
    fontWeight: 'bold'
  }
});
