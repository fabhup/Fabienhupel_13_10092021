import React from 'react'
import styled from 'styled-components'
import mediaQuery from '../utils/style/mediaQuery'
import colors from '../utils/style/color'
import PropTypes from 'prop-types'

const FeaturesContainer = styled.section`
    display: flex;
    flex-direction: column;
    ${mediaQuery.min.desktop`
        flex-direction: row;
    `}
`

const FeaturesTitle = styled.h2`
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0;
    color: ${colors.primary};
`

const FeatureItem = styled.div`
    flex: 1;
    padding: 2.5rem;
`

const FeatureItemIcon = styled.img`
    width: 100px;
    border: 10px solid ${colors.primaryLight};
    border-radius: 50%;
    padding: 1rem;
`

const FeatureItemTitle = styled.h3`
color: ${colors.tertiary};
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem; 
`
const FeatureItemText = styled.p``
export default function Features({ featuresTitle, featuresData }) {
    return (
        <FeaturesContainer>
            <FeaturesTitle className={featuresTitle.display ? '' : 'sr-only'}>
                {featuresTitle.title}
            </FeaturesTitle>
            {featuresData &&
                featuresData.length > 0 &&
                featuresData.map((featureItem) => (
                    <FeatureItem key={featureItem.key}>
                        <FeatureItemIcon
                            src={featureItem.image.src}
                            alt={featureItem.image.alt}
                        />
                        <FeatureItemTitle>{featureItem.title}</FeatureItemTitle>
                        <FeatureItemText>{featureItem.text}</FeatureItemText>
                    </FeatureItem>
                ))}
        </FeaturesContainer>
    )
}

Features.propTypes = {
    featuresTitle: PropTypes.shape({
        title: PropTypes.string.isRequired,
        display: PropTypes.bool,
    }),
    featuresData: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            image: PropTypes.shape({
                src: PropTypes.string.isRequired,
                alt: PropTypes.string.isRequired,
            }),
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
}
