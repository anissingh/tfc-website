import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import '../Common/buttons.css';
import {useEffect, useState} from "react";
import {BASE_URL, BASE_PORT} from "../../settings/settings";
import EnrollClassModal from "../EnrollClassModal";
import {beautifyDate} from "../../utils/utils";
import '../Common/fonts.css'

const ClassScheduleItem = ({classInfo, update}) => {

    const [keywords, setKeywords] = useState([])
    const [openEnrollModal, setOpenEnrollModal] = useState(false)

    useEffect(() => {
        fetch(`http://${BASE_URL}:${BASE_PORT}/studios/classes/${classInfo.cls.id}/keywords/`)
            .then(res => {
                if(res.status !== 200) {
                    // TODO: Handle
                    throw new Error('Unknown error occurred.')
                } else {
                    return res.json()
                }
            })
            .then(res => {
                setKeywords(res.keywords)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [classInfo.cls.id])

    const clientSideEnroll = () => {
        update()
    }

    return (
        <>
        <EnrollClassModal open={openEnrollModal} onClose={() => setOpenEnrollModal(false)} classInfo={classInfo}
        onEnroll={clientSideEnroll}/>
        <div className="container-fluid d-flex flex-column class-schedule-item-background">
            <div className="row mt-2">
                <div className="col-2 align-self-center">
                    <div className="d-flex flex-column">
                        <div className="ms-4">
                            <p className="mb-1"><b>{beautifyDate(classInfo.date)}</b></p>
                            <p>{classInfo.startTime} <span className="circle-dot"> &#9679; </span>{classInfo.endTime}</p>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                </div>
                <div className="col-5 align-self-center">
                    <div className="d-flex flex-column">
                        <div className="align-self-center w-100">
                            <p className="mb-0"><b>{classInfo.cls.name}</b></p>
                            <p>{keywords.map((keyword, index) => (
                                <span key={index}>{keyword.word} <span className="circle-dot"> &#9679; </span> </span>
                            ))}</p>
                        </div>
                    </div>
                </div>
                <div className="col-2 align-self-center">
                    <div className="d-flex flex-column">
                        <div className="align-self-center">
                            <p>{classInfo.coach}</p>
                        </div>
                    </div>
                </div>
                <div className="col-2 align-self-center">
                    <div className="d-flex flex-column">
                        <div className="align-self-center">
                            <button className="btn btn-orange-fade" onClick={() => setOpenEnrollModal(true)}>Enroll</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default ClassScheduleItem;