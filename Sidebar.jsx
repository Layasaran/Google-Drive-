import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import DevicesIcon from '@material-ui/icons/Devices';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import styled from 'styled-components';
import { Modal } from '@material-ui/core';
import { useState } from 'react';

const SidebarContainer = styled.div`
    margin-top: 10px;
`;

const SidebarBtn = styled.div`
    button {
        background: transparent;
        border: 1px solid lightgray;
        display: flex;
        align-items: center;
        border-radius: 40px;
        padding: 5px 10px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        margin-left: 20px;
        span {
            font-size: 16px;
            margin-right: 20px;
            margin-left: 10px;
        }
    }
`;

const SidebarOptions = styled.div`
    margin-top: 10px;
    .progress_bar {
        padding: 0px 20px;
    }
    .progress_bar span {
        display: block;
        color: #333;
        font-size: 13px;
    }
`;

const SidebarOption = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: 0px 20px 20px 0px;
    &:hover {
        background: whitesmoke;
        cursor: pointer;
    }
    svg.MuiSvgIcon-root {
        color: rgb(78, 78, 78);
    }
    span {
        margin-left: 15px;
        font-size: 13px;
        font-weight: 500;
        color: rgb(78, 78, 78);
    }
`;

const ModalPopup = styled.div`
    top: 50%;
    background-color: #fff;
    width: 500px;
    margin: 0px auto;
    position: relative;
    transform: translateY(-50%);
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const ModalHeading = styled.div`
    text-align: center;
    border-bottom: 1px solid lightgray;
    height: 40px;
`;

const ModalBody = styled.div`
    input.modal__submit {
        width: 100%;
        background: darkmagenta;
        padding: 10px 20px;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 5px;
        font-size: 16px;
        border: 0;
        outline: 0;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
    }
    input.modal__file {
        background: whitesmoke;
        padding: 20px;
        color: #000;
        display: block;
        margin-top: 20px;
    }
`;

const UploadingPara = styled.p`
    background: green;
    color: #fff;
    margin: 20px;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
`;

const options = [
    { icon: <MobileScreenShareIcon />, label: "My Drive" },
    { icon: <DevicesIcon />, label: "Computers" },
    { icon: <PeopleAltOutlinedIcon />, label: "Shared with me" },
    { icon: <QueryBuilderOutlinedIcon />, label: "Recent" },
    { icon: <StarBorderOutlinedIcon />, label: "Starred" },
    { icon: <DeleteOutlineOutlinedIcon />, label: "Trash" },
];

function Sidebar() {
    const [open, setOpen] = useState(false);
    const [upload, setUpload] = useState(false);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFile = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setUpload(true);
        setTimeout(() => setUpload(false), 3000); // Simulate upload completion
    };

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalPopup>
                    <form onSubmit={handleUpload}>
                        <ModalHeading>
                            <h3>Select file you want to upload</h3>
                        </ModalHeading>
                        <ModalBody>
                            {upload ? (
                                <UploadingPara>Uploading...</UploadingPara>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        className="modal__file"
                                        onChange={handleFile}
                                    />
                                    {fileName && <p>Selected file: {fileName}</p>}
                                    <input type="submit" className="modal__submit" />
                                </>
                            )}
                        </ModalBody>
                    </form>
                </ModalPopup>
            </Modal>
            <SidebarContainer>
                <SidebarBtn>
                    <button onClick={() => setOpen(true)} aria-label="Upload new file">
                        <img src="symbol.png" width="40" height="40" alt="New file icon" />
                        <span>New</span>
                    </button>
                </SidebarBtn>
                <SidebarOptions>
                    {options.map((option, index) => (
                        <SidebarOption key={index}>
                            {option.icon}
                            <span>{option.label}</span>
                        </SidebarOption>
                    ))}
                </SidebarOptions>
                <hr />
                <SidebarOptions>
                    <SidebarOption>
                        <CloudQueueIcon />
                        <span>Storage</span>
                    </SidebarOption>
                    <div className="progress_bar">
                        <progress value="50" max="100" style={{ width: "100%", color: "blue" }} />
                        <span>105 GB of 200 GB used</span>
                    </div>
                </SidebarOptions>
            </SidebarContainer>
        </>
    );
}

export default Sidebar;
