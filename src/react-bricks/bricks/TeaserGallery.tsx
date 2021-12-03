import React from 'react'
import { Repeater, types } from 'react-bricks'
import Column from '../../components/grid/column'
import Row from '../../components/grid/row'
import Unit from '../../components/Unit'
import './TeaserGallery.scss'

interface TeaserGalleryProps {
  teasers: string
}

const TeaserGallery: types.Brick<TeaserGalleryProps> = () => {
  return (
    <Unit className="teaser-gallery">
      <Repeater
        propName="teasers"
        renderWrapper={(items) => <Row>{items}</Row>}
        renderItemWrapper={(item) => (
          <Column xs={12} m={6}>
            {item}
          </Column>
        )}
      />
    </Unit>
  )
}

TeaserGallery.schema = {
  name: 'teaser-gallery',
  label: 'Teaser Galerie',
  getDefaultProps: () => ({
    teasers: [],
  }),
  repeaterItems: [
    {
      name: 'teasers',
      itemType: 'teaser',
      itemLabel: 'Teaser',
      max: 4,
    },
  ],
}

export default TeaserGallery
