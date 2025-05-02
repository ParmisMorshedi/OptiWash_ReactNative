import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  "container": {
    "flex": 1,
    "padding": 20,
    "backgroundColor": "#f5f5f5"
  },
  "title": {
    "fontSize": 22,
    "fontWeight": "bold",
    "marginBottom": 20
  },
  "label": {
    "fontSize": 16,
    "marginBottom": 5
  },
  "input": {
    "borderWidth": 1,
    "borderColor": "#ccc",
    "padding": 10,
    "borderRadius": 8,
    "marginBottom": 15
  },
  "card": {
    "backgroundColor": "#fff",
    "padding": 16,
    "borderRadius": 8,
    "marginBottom": 12,
    "elevation": 2
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  "actionButtons": {
    "flexDirection": "row",
    "backgroundColor": "#f5f5f5",
    "justifyContent": "flex-end",
    "alignItems": "center"
  },
  "editButton": {
    "backgroundColor": "#FFD700",
    "padding": 15,
    "borderRadius": 5,
    "marginRight": 5
  },
  "deleteButton": {
    "backgroundColor": "#FF3B30",
    "padding": 15,
    "borderRadius": 5
  },
  "actionText": {
    "color": "white",
    "fontWeight": "bold"
  }
});
