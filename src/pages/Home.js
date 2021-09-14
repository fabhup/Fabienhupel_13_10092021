import '../styles/Home.css'
import HeroBanner from '../components/HeroBanner'
import banktreeImage from '../assets/bank-tree.jpeg'
import moneyIcon from '../assets/icon-money.png'
import chatIcon from '../assets/icon-chat.png'
import securityIcon from '../assets/icon-security.png'

import Features from '../components/Features'

function Home() {
    const heroTitle = 'Promoted Content'
    const heroSubtitlesList = [
        'No fees.',
        'No minimum deposit.',
        'High interest rates.',
    ]
    const heroTextContent = 'Open a savings account with Argent Bank today!'

    const featuresData = [
        {
            key: 'feature1',
            title: 'You are our #1 priority',
            image: { src: chatIcon, alt: 'Chat Icon' },
            text: `Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.`,
        },
        {
            key: 'feature2',
            title: 'More savings means higher rates',
            image: { src: moneyIcon, alt: 'Money Icon' },
            text: `The more you save with us, the higher your interest rate will be!`,
        },
        {
            key: 'feature3',
            title: 'Security you can trust',
            image: { src: securityIcon, alt: 'Security Icon' },
            text: `We use top of the line encryption to make sure your data and money
            is always safe.`,
        },
    ]

    return (
        <main className="homepage">
            <HeroBanner
                heroTitle={{ title: heroTitle, display: false }}
                heroBackgroundImage={banktreeImage}
                heroSubtitlesList={heroSubtitlesList}
                heroTextContent={heroTextContent}
            />
            <Features
                featuresData={featuresData}
                featuresTitle={{ title: 'Features', display: false }}
            />
        </main>
    )
}

export default Home
