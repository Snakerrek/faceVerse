import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import styles from './HomeScreen.styles';

interface MenuModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: 'Profile' | 'Settings') => void;
  onLogout: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({
  visible,
  onClose,
  onNavigate,
  onLogout,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <View style={styles.menuContainer} onStartShouldSetResponder={() => true}>
          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => onNavigate('Profile')}
          >
            <Text style={styles.menuOptionText}>My Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuOption}
            onPress={() => onNavigate('Settings')}
          >
            <Text style={styles.menuOptionText}>Settings</Text>
          </TouchableOpacity>

          <View style={styles.menuSeparator} />

          <TouchableOpacity style={styles.menuOption} onPress={onLogout}>
            <Text style={styles.menuOptionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
};

export default MenuModal;