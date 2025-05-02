import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2f3640'
  },
  email: {
    fontSize: 16,
    color: '#718093',
    marginTop: 4
  },
  role: {
    fontSize: 14,
    color: '#0097e6',
    marginTop: 10
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#e84118',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  logoutText: {
    color: '#fff',
    fontSize: 16
  }
});
