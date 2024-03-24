import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1},
  dialog: {backgroundColor: 'white', borderRadius: 20},
  safeArea: {flex: 1},
  header: {
    marginHorizontal: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
  },
  userContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userName: {
    color: 'red',
  },
  listContentContainer: {
    marginHorizontal: 30,
    paddingBottom: 60,
  },
  cityCard: {
    marginBottom: 20,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6C6C6C', // Lighter color
  },
  infoValue: {
    // fontSize: 20, // Smaller font size
    marginLeft: 4, // Add some spacing between label and value
  },
  settingsContainer: {},
});

export default styles;
