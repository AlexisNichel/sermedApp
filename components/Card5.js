import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
class Card extends React.Component {
  render() {
    const { item, horizontal, full, style, ctaColor, imageStyle } = this.props;
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
      return (
        <Block row={horizontal} card flex style={cardContainer}>
          <Block style={imgContainer}>
            <Image source={item.imagen} style={imageStyles} />
          </Block>
        <Block  space="between" flex style={styles.cardDescription}>
            <Text size={16} bold style={styles.cardTitle}>{item.title} </Text>
            <Text size={14} muted={true}>{item.subtitle}</Text>
          </Block>
      </Block>
      );
  }
}
Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    minHeight: 90,
    maxHeight: 120,
    marginBottom: 0
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE 
  },
  imageContainer: {
    overflow: 'hidden'
  },
  horizontalImage: {
    marginTop : 10,
    marginLeft : 10,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 0
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 0
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 0,
  },
  avatarContainer: {
    position: "relative",
    marginTop: 0,
    marginLeft: 0
  },
});
export default withNavigation(Card);