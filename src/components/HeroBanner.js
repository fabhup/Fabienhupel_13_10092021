import React from 'react'
import styled from 'styled-components'
import mediaQuery from '../utils/style/mediaQuery'
import colors from '../utils/style/color'
import PropTypes from 'prop-types'

const HeroBannerContainer = styled.div`
    background-image: url(${(props) => props.backgroundImage});
    background-position: 0 -50px;
    background-size: cover;
    background-repeat: no-repeat;
    height: max(300px, 20rem);
    position: relative;

    ${mediaQuery.min.desktop`
        height: max(400px, 25rem);
        background-position: 0% 33%;
    `}
`

const HeroContent = styled.section`
    position: relative;
    top: 2rem;
    width: 200px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    padding: 2rem;
    text-align: left;
    margin: 0 auto;
    ${mediaQuery.min.desktop`
        position: absolute;
        top: 50px;
        right: 50px;
        width: 300px;
        margin: 2rem;
    `}
`

const HeroTitle = styled.h2`
    font-weight: bold;
    font-size: 1.8rem;
    margin: 0;
    color: ${colors.primary};
`

const HeroSubtitle = styled.p`
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
    ${mediaQuery.min.desktop`
        font-size: 1.5rem;
    `}
`

const HeroTextContent = styled.p`
    margin-bottom: 0;
    margin-top: 1rem;
    font-size: 0.9rem;
    ${mediaQuery.min.desktop`
        font-size: 1.2rem;
    `}
`

export default function HeroBanner({
    heroTitle,
    heroBackgroundImage,
    heroSubtitlesList,
    heroTextContent,
}) {
    return (
        <HeroBannerContainer backgroundImage={heroBackgroundImage}>
            <HeroContent backgroundColor>
                <HeroTitle className={heroTitle.display ? '' : 'sr-only'}>
                    {heroTitle.title}
                </HeroTitle>
                {heroSubtitlesList &&
                    heroSubtitlesList.length > 0 &&
                    heroSubtitlesList.map((textSubtitle, index) => (
                        <HeroSubtitle key={index}>{textSubtitle}</HeroSubtitle>
                    ))}
                {heroTextContent && (
                    <HeroTextContent>{heroTextContent}</HeroTextContent>
                )}
            </HeroContent>
        </HeroBannerContainer>
    )
}

HeroBanner.propTypes = {
    heroTitle: PropTypes.shape({
        title: PropTypes.string,
        display: PropTypes.bool,
    }),
    heroBackgroundImage: PropTypes.string,
    heroSubtitlesList: PropTypes.arrayOf(PropTypes.string),
    heroTextContent: PropTypes.string,
}
