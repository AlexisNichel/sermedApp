
import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { StyleSheet, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme,Images } from '../constants';

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
            <Image source={Images.Medico2} style={imageStyles} />
          </Block>
        <Block  space="between" flex style={styles.cardDescription}>
        <Text size={14} style={styles.cardTitle}>{item.prestador_nombre} {item.prestador_apellido}</Text>
            <Text size={12} bold>{item.especialidad}</Text>
            <Text size={12} bold></Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || argonTheme.COLORS.ACTIVE} bold>{item.institucion_prestadora}</Text>
            <Text size={12}>{item.ciudad_prest}</Text>
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
    minHeight: 114,
    marginBottom: 16
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
    marginTop : 20,
    marginLeft : 20,
    width: 70,
    height: 70,
    borderRadius: 0,
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
    marginTop : 20,
    marginLeft : 20,
    width: 70,
    height: 70,
    borderRadius: 0,
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