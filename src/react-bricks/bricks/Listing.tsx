import React from 'react'
import { Repeater, types } from 'react-bricks'
import Brick from '../../components/Brick'
import Column from '../../components/grid/column'
import Row from '../../components/grid/row'
import Spacer from '../../components/Spacer'
import './Listing.scss'
import {
  LayoutDefaultProps,
  LayoutInterface,
  LayoutProps,
} from './sideProps/LayoutProps'

interface ListingProps extends LayoutInterface {
  title: string
  items: string
  columns: 1 | 2
}

const Listing: types.Brick<ListingProps> = ({
  title,
  width,
  columns,
  paddingTop,
  paddingBottom,
}) => {
  return (
    <Brick
      className="listing"
      width={width}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      {title && (
        <>
          <Row>
            <Column xs={12}>
              <h5>{title}</h5>
            </Column>
          </Row>
          <Spacer size={1} />
        </>
      )}
      <Repeater
        propName="items"
        renderWrapper={(items) => (
          <Row>
            <Column xs={12}>{items}</Column>
          </Row>
        )}
      />
    </Brick>
  )
}

Listing.schema = {
  name: 'listing',
  label: 'Liste',
  getDefaultProps: () => ({
    items: [
      {
        text: 'Listenelement',
      },
    ],
    columns: 2,
    ...LayoutDefaultProps,
  }),
  repeaterItems: [
    {
      name: 'items',
      itemType: 'listing-item',
      itemLabel: 'Listenelement',
      max: 8,
    },
  ],
  sideEditProps: [
    LayoutProps,
    {
      groupName: 'Liste',
      defaultOpen: true,
      props: [
        {
          name: 'title',
          label: 'Überschrift',
          type: types.SideEditPropType.Text,
        },
        {
          name: 'columns',
          label: 'Spalten',
          type: types.SideEditPropType.Number,
          rangeOptions: {
            min: 1,
            max: 2,
            step: 1,
          },
        },
      ],
    },
  ],
}

export default Listing
