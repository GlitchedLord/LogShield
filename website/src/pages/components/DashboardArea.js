import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/DashboardArea.module.css';
import TopRow from './TopRow';
import ActivityCard from './ActivityCard';
import NodeCard from './NodeCard';
import LargestAttacks from './LargestAttacks';
import APICard from './APICard';
import LoadingBar from './LoadingBar';
import Performance from './Performance';

const DashboardArea = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.post('http://localhost:7000/logshield/api/admin', {
                "auth": "aielgv8sgeasgryleairgearihu",
            }).catch((err) => console.log(err));
            if (result === undefined) {
                return;
            }
            setData(result.data);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
        fetchData();
    }, []);

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <div className={styles.dashboardArea}>
            <br></br><br></br><br></br><br></br>
            <Performance data={data} />
            <br></br><br></br>
            <div className={styles.row}>
                <LargestAttacks data={data} />
                <APICard data={data} />
                <NodeCard data={data} />
            </div>
            <TopRow data={data} />
            <br></br><br></br>
            <div className={styles.row}>
                <ActivityCard data={data} />
            </div>
        </div>
    );
};

export default DashboardArea;