import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import API_URL from '../../../config';
import styles from '../../styles/Car/DeleteCarModal.styles';


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
      const res = await fetch(`${API_URL}/Cars/${carId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        Alert.alert('✅ Klart', 'Bilen togs bort!');
        onDeleted();
        onClose();
      } else {
        Alert.alert('❌ Fel', 'Kunde inte ta bort bilen.');
      }
    } catch {
      Alert.alert('❌ Fel', 'Något gick fel.');
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
