import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#111827',
    textAlign: 'center',
  },
  card: {
    padding: 15,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginBottom: 12,
  },
  plateText: {
    fontSize: 16,
    color: '#1F2937',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#94A3B8',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
