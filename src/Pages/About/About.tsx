import React from 'react';
import Card from '@/Components/Card/Card';
import image from '/Images/HeroImage.png';
import styles from './Style/About.module.css';


const About = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>About CodeVider</h1>
            <div className={styles.gridContainer}>
                <Card
                    className={styles.mainCard}
                    backgroundColor="rgba(255, 255, 255, 0.5)
"
                >
                    <div className={styles.mainContent}>
                        <h2 className={styles.cardTitle}>Who We Are</h2>
                        <p className={styles.description}>
                            CodeVider is an Albanian-based web development
                            outsourcing company offering full-stack development
                            services. We specialize in building commercial-grade
                            web applications using cutting-edge technologies
                            like React, Angular, Node.js, and Python.
                        </p>
                    </div>
                </Card>

                <Card
                    className={styles.mainCard}
                    backgroundColor="rgba(255, 255, 255, 0.5)
"
                >
                    <div className={styles.mainContent}>
                        <h2 className={styles.cardTitle}>What We Do</h2>
                        <p className={styles.description}>
                            Our services span front-end, back-end, and database
                            development, with a focus on cost savings, time
                            efficiency, and flexibility. We adhere to agile
                            methodologies and ensure seamless communication
                            through dedicated project managers.
                        </p>
                    </div>
                </Card>

                <Card
                    className={styles.mainCard}
                    backgroundColor="rgba(255, 255, 255, 0.5)
"
                >
                    <div className={styles.mainContent}>
                        <h2 className={styles.cardTitle}>Our Approach</h2>
                        <p className={styles.description}>
                            At CodeVider, we believe in a collaborative approach
                            to software development. We work closely with our
                            clients to understand their unique needs and deliver
                            tailored solutions that drive business growth and
                            enhance user experiences.
                        </p>
                    </div>
                </Card>

                <Card
                    className={styles.imageCard}
                    backgroundColor="rgba(255, 255, 255, 0.5)
"
                >
                    <img
                        src={image}
                        alt="CodeVider Team"
                        className={styles.image}
                    />
                </Card>

                <Card
                    className={styles.fullWidthCard}
                    backgroundColor="rgba(255, 255, 255, 0.5)
"
                >
                    <h2 className={styles.cardTitle}>Our Mission</h2>
                    <p className={styles.description}>
                        To deliver innovative and efficient web solutions that
                        drive business growth and user satisfaction.
                    </p>
                </Card>
            </div>

            <div className={styles.ctaContainer}>
                <a
                    href="https://www.codevider.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cta}
                >
                    Discover More About CodeVider
                </a>
            </div>
        </div>
    )
}

export default About;

