import cx from 'classnames'
import React from 'react'
import { RichText, Text, types, usePageValues } from 'react-bricks/frontend'
import Column from '../../../components/Grid/Column'
import Row from '../../../components/Grid/Row'
import Meta from '../../../components/Meta'
import Unit from '../../../components/Unit'
import { randomIntFromInterval } from '../../../utils/randomIntFromInterval'
import './styles.scss'

interface PageStageProps {
  title: string
  text: string
  subheadline: boolean
  meta: boolean
}

const PageStage: types.Brick<PageStageProps> = ({ subheadline, meta }) => {
  const [page] = usePageValues()

  return (
    <Unit className="page-stage">
      <Row>
        <Column xs={12}>
          <div className="page-stage__inner">
            <Text
              renderBlock={(props) => (
                <h1 className="page-stage__title">{props.children}</h1>
              )}
              placeholder="Wie soll die Seite heißen?"
              propName="title"
            />
            {meta && <Meta publishedAt={page.publishedAt} tags={page.tags} />}
            {subheadline && (
              <RichText
                renderBlock={({ children }) => (
                  <p
                    className={cx({
                      'page-stage__text': true,
                      'page-stage__text--withPaddingTop': meta,
                    })}
                  >
                    {children}
                  </p>
                )}
                allowedFeatures={[types.RichTextFeatures.Highlight]}
                placeholder="Ein aussagekräftiger Einleitungstext"
                renderHighlight={({ children }) => (
                  <span
                    className="is-highlighted"
                    style={{
                      ['--random' as any]: `${randomIntFromInterval(-1, 1)}deg`,
                    }}
                  >
                    {children}
                  </span>
                )}
                propName="text"
              />
            )}
          </div>
        </Column>
      </Row>
    </Unit>
  )
}

PageStage.schema = {
  name: 'page-stage',
  label: 'Seitenbühne',
  getDefaultProps: () => ({
    title: 'Seitentitel',
    text: 'Einleitungstext',
  }),
  sideEditProps: [
    {
      name: 'meta',
      label: 'Metainformationen anzeigen',
      type: types.SideEditPropType.Boolean,
    },
    {
      name: 'subheadline',
      label: 'Einleitungstext anzeigen',
      type: types.SideEditPropType.Boolean,
    },
  ],
}

export default PageStage
