import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import API_URL from '../../config';

interface Props {
  visible: boolean;
  carId: number;
  plateNumber: string;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteCarModal = ({ visible, carId, plateNumber, onClose, onDeleted }: Props) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/Cars/${carId}`, { method: 'DELETE' });
      if (res.ok) {
        Alert.alert('Succé', 'Bilen togs bort!');
        onDeleted();
        onClose();
      } else {
        Alert.alert('Fel', 'Kunde inte ta bort bilen.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Fel', 'Något gick fel.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Ta bort bilen?</Text>
          <Text>{plateNumber}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleDelete} style={styles.confirm}>
              <Text style={styles.text}>Ja, ta bort</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.text}>Avbryt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteCarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  confirm: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cancel: {
    backgroundColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
