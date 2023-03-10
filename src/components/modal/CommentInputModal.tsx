import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import MyFormHelperText from "@mui/material/FormHelperText";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./CommentInputModal.module.css";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../utils/recoil/modal";

// import { useHistory } from "react-router-dom";
interface subject {
  subject: string;
}

export default function CommentInputModal({subject}:subject) {
  const [star_rating, setRating] = useState<number | null>(null);
  const [time_taken, setElapsed] = useState("");
  const [amount_study, setAmountStudy] = useState("");
  const [difficulty, setDiffi] = useState("");
  const [bonus, setBonus] = useState("");
  const [content, setContent] = useState("");
  const [isCommentModal, setIsCommentModal] = useRecoilState(modalState)

  // const history = useHistory();
    // useEffect(() => {
    //   console.log(content);
    // }, [content]);

  const handleChangeTime = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setElapsed(newAlignment);
  };

  const handleChangeAmount = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAmountStudy(newAlignment);
  };

  const handleChangeDiffi = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setDiffi(newAlignment);
  };

  const handleChangeBonus = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setBonus(newAlignment);
  };

  const onClickSubmit = () => {
    fetch("http://localhost:3001/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intraid: "sooyang",
        sbj_name: subject,
        star_rating,
        time_taken,
        difficulty,
        amount_study,
        bonus,
        content,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("????????? ?????????????????????.");
        // history.push("/");
      }
    });
    setIsCommentModal({ isModal: false });
  };

  function onCancleButton() {
    setIsCommentModal({ isModal: false });
  }

  return (
    <div className={styles.back}>
    <Card>
      <CardContent>
        <form>
          <div className={styles.margin}>
            ????????? ??????????????? ????????? ????????????????
          </div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={time_taken}
            exclusive
            onChange={handleChangeTime}
            aria-label="Platform"
          >
            <ToggleButton value="a_week">????????? ??????</ToggleButton>
            <ToggleButton value="two_week">1~2??? ??????</ToggleButton>
            <ToggleButton value="three_week">3~4??? ??????</ToggleButton>
            <ToggleButton value="a_month">??? ??? ??????</ToggleButton>
            <ToggleButton value="three_month">??? ??? ??????</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>????????? ???????????? ?????????????</div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={difficulty}
            exclusive
            onChange={handleChangeDiffi}
            aria-label="Platform"
          >
            <ToggleButton value="easy">?????????</ToggleButton>
            <ToggleButton value="normal">???????????????</ToggleButton>
            <ToggleButton value="hard">????????????</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>
            ????????? ???????????? ?????? ????????? ?????? ????????? ??????????
          </div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={amount_study}
            exclusive
            onChange={handleChangeAmount}
            aria-label="Platform"
          >
            <ToggleButton value="low">?????? ????????????</ToggleButton>
            <ToggleButton value="middle">???????????????</ToggleButton>
            <ToggleButton value="high">?????????</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.margin}>??? ????????? ???????????? ???????????????????</div>
          <ToggleButtonGroup
            className={styles.boxmargin}
            color="primary"
            value={bonus}
            exclusive
            onChange={handleChangeBonus}
            aria-label="Platform"
          >
            <ToggleButton value="no">??? ?????????</ToggleButton>
            <ToggleButton value="little">?????? ?????????</ToggleButton>
            <ToggleButton value="complete">??? ?????????</ToggleButton>
          </ToggleButtonGroup>
          <div className={styles.boxmargin}>
            <div className={`${styles.margin && styles.flex}`}>
              <span className={styles.inlinetext}>??? ??????</span>
              <Rating
                size="large"
                className={styles.margin}
                name="simple-controlled"
                value={star_rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="??????"
              multiline
              rows={4}
              placeholder="????????? ?????? ????????? ???????????????."
              style={{ width: "100%", height: "120px" }}
              onChange={(e) => setContent(e.target.value)}
            />
            <MyFormHelperText />
          </div>
          <div className={styles.submit}>
            <Button variant="outlined" onClick={onCancleButton}>??????</Button>
            <Button variant="contained" onClick={onClickSubmit}>
              ??????
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}
