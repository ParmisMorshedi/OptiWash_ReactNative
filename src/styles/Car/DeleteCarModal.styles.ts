import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20
  },
  confirm: {
    backgroundColor: '#EF4444',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  cancel: {
    backgroundColor: '#94A3B8',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default styles;
