import image from '/Images/office.jpg'
import styles from './Style/About.module.css'
import image5 from '/Images/employe.webp'
import ImageCarousel from './Component/ImageCarousel'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Stepper from './Component/Stepper'
import { useTheme } from '@mui/material'

const About = () => {
    const images = [
        { src: image5, alt: 'Employee 1', },
        { src: image5, alt: 'Employee 2' },
        { src: image5, alt: 'Employee 3' },
        { src: image5, alt: 'Employee 4' },
        { src: image5, alt: 'Employee 5' },
    ]

    useEffect(() => {
        AOS.init({ once: true })
    }, [])
    const theme = useTheme()
    const themeStyle = {
        color: theme.palette.text.primary,
    }

    return (
        <div className={styles.container}>
            <div className={styles.heroSection}>
                <div className={styles.overlay}>
                    <img src={image} alt="Hero" className={styles.heroImage} />
                </div>
                <h1 className={styles.mainTitle}>About CodeVider</h1>
            </div>

            <div className={styles.infoContainer}>
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className={styles.infoSection}
                >
                    <h2 style={themeStyle}>Who We Are </h2>

                    <p style={themeStyle}>
                        CodeVider is an Albanian-based web development
                        outsourcing company offering full-stack development
                        services. We specialize in building commercial-grade web
                        applications using cutting-edge technologies like React,
                        Angular, Node.js, and Python. Our team is composed of
                        highly skilled developers, designers, and project
                        managers who bring a wealth of experience to every
                        project.
                    </p>
                    <p style={themeStyle}>
                        Since our founding, we've partnered with clients from a
                        variety of industries, including finance, healthcare,
                        education, and e-commerce, to deliver solutions that are
                        not only innovative but also scalable and secure. Our
                        mission is to empower businesses by creating digital
                        products that streamline operations, enhance customer
                        experiences, and drive growth.
                    </p>
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    className={styles.infoSection}
                >
                    <h2 style={themeStyle}>What We Do</h2>
                    <p style={themeStyle}>
                        Our services span front-end, back-end, and database
                        development, with a focus on cost savings, time
                        efficiency, and flexibility. We adhere to agile
                        methodologies and ensure seamless communication through
                        dedicated project managers.
                    </p>
                    <p style={themeStyle}>
                        Communication is key to the success of any project,
                        which is why we assign dedicated project managers to
                        each engagement. These project managers act as your main
                        point of contact, ensuring that your project stays on
                        track, deadlines are met, and any issues are promptly
                        addressed. This approach guarantees that the development
                        process is as smooth and transparent as possible.
                    </p>
                    <Stepper />
                </div>

                <div
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    className={styles.infoSection}
                >
                    <h2 style={themeStyle}>Our Mission</h2>
                    <p style={themeStyle}>
                        To deliver innovative and efficient web solutions that
                        drive business growth and user satisfaction.
                    </p>
                    <p style={themeStyle}>
                        Beyond the technical aspects, we also offer consultation
                        services to help you define your project's scope, choose
                        the right technologies, and plan for future growth. Our
                        goal is to be more than just a service provider—we aim
                        to be a trusted partner in your digital transformation
                        journey.
                    </p>
                    <p style={themeStyle}>
                        Whether you're building a new application from scratch,
                        upgrading an existing system, or integrating new
                        features, CodeVider is here to help you achieve your
                        business goals with top-notch web development services.
                    </p>
                </div>
                <div className={styles} data-aos="fade-up" data-aos-duration="2000">

                <h3 className={styles.carouselTitle} style={themeStyle}>Our Team</h3>
                <div className={styles.carouselContainer}>
                    <ImageCarousel images={images} />
                </div>
                </div>

            </div>

               
         

          

            {/* <div className={styles.ctaContainer}> */}
                <a
                    href="https://www.codevider.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    Discover More About CodeVider
                </a>
            {/* </div> */}
        </div>
    )
}

export default About
