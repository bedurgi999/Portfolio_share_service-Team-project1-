import { useState, useEffect } from "react";
import { Form, Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import "./ProfilePage.css";

function UserEditForm({ user, setUser }) {
  const defaultImage = "https://team3.cdn.ntruss.com/default.png";
  const [updateUser, setUpdateUser] = useState({});

  const [newPassword, setNewPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [isValidName, setIsValidName] = useState(true);

  const [profile, setProfile] = useState({});

  // 수정할 정보를 입력받기 전, 기존 user 정보를 세팅함.
  useEffect(() => {
    if(Object.keys(user).length > 0)
      setUpdateUser({
        name: user.name,
        description: user.description,
        job: user.job,
        github: user.github,
        gitlab: user.gitlab,
        twitter: user.twitter,
        instagram: user.instagram,
        youtube: user.youtube,
      });
      setProfile({
        profileObj: "",
        preview: "",
        currentUrl: user.profile ?? defaultImage,
    });
  }, [user]);

  useEffect(() => {
    if (isCorrectPassword) {
      setUpdateUser({ ...updateUser, password: newPassword });
    }
  }, [newPassword, isCorrectPassword]);

  // imageupload 함수
  // profileObj : 사용자가 업로드한 사진 객체
  // currentUrl : 사용자의 현재 프로필 url 혹은 기본 이미지 url
  // preview : 사용자가 업로드한 사진 미리보기 url (변경사항 저장 전까지 서버에 이미지 업로드 x)
  
  // default 이미지로 세팅함. 
  // (currentUrl => default 이미지)
  const setDefaultHandler = async (e) => {
    e.preventDefault();

    setProfile((current) => {
      const newValue = {
        profileObj: "",
        currentUrl: defaultImage,
        preview: "",
      };
      return newValue;
    });
  };

  // 현재 값으로 이미지 세팅함. 
  // (profileObj => 업로드한 이미지 객체 , preview => 업로드 이미지 미리보기 url)
  const changeHandler = (e) => {
    e.preventDefault();

    if (profile.preview) {
      URL.revokeObjectURL(profile.preview);
    }

    setProfile((current) => {
      const newValue = {
        ...current,
        profileObj: e.target.files[0],
        preview: URL.createObjectURL(e.target.files[0]),
      };
      return newValue;
    });
  };

  // submit 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // imageupload 코드
    let updatedProfile = { data: profile.currentUrl };

    // 미리보기 url 삭제
    if (profile.preview) {
      URL.revokeObjectURL(profile.preview);
    }

    const prevImage = user.profile ?? null;

    // Api postImg로 이미지를 업로드함.
    if (profile.profileObj) {
      const fd = new FormData();
      fd.append("filename", profile.profileObj);
      fd.append("prevImage", prevImage);
      try {
        updatedProfile = await Api.postImg("upload", fd);
        setProfile((current) => {
          const newValue = {
            profileObj: {},
            currentUrl: updatedProfile.data,
            preview: "",
          };
          return newValue;
        });
      } catch (err) {
        console.log(err.response);
      }
    } else if (profile.currentUrl === defaultImage && profile.currentUrl !== user.profile) {
      const toDelete = user.profile.split("/").slice(-1)[0];
      try {
        await Api.delete("deleteImg", toDelete);
      } catch (e) {
        console.log(e);
      }
    }

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name: updateUser.name,
      description: updateUser.description,
      job: updateUser.job,
      github: updateUser.github,
      gitlab: updateUser.gitlab,
      twitter: updateUser.twitter,
      instagram: updateUser.instagram,
      youtube: updateUser.youtube,
      password: updateUser.password,
      profile: updatedProfile.data === defaultImage ? "default" : updatedProfile.data,
    });
    // 해당 유저 정보로 user을 세팅함.
    setUser(res.data);

    alert("프로필 정보가 수정되었습니다.");
    // window.location.replace("/");
  };

  // 프로필 페이지의 프로필 카드 설정 부분
  // 기존 유저값이 세팅되어 있고 새로운 값을 입력받아 수정함.
  // 프로필 이미지, 이름, email, 소개, 직무, 소셜 링크, 비밀번호 변경 가능
  return (
    <Card border="light">
      <Card.Body>
        <div
          className="text-muted"
          style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "20px 0 10px 0" }}
        >
          <span
            className="material-icons"
            style={{ verticalAlign: "middle" }}
          >
            image
          </span>{" "}
          프로필 이미지
        </div>
        <div
          className="text-muted"
          style={{ fontSize: "12px" }}
        >
          프로필 이미지는 여러분을 표현하는 가장 첫 단계입니다.<br />
          자신을 표현하는 프로필 이미지를 설정해보세요!
        </div>
        <div style={{ padding: '10px', margin: '0 30% 0 30%'}}>
          <Row className="justify-content-md-center">
            <Card.Img
              style={{ width: "9rem", height: "9rem", borderRadius:"100px", margin:0, padding:0, }}
              className="mb-3"
              src={profile.preview ? profile.preview : profile.currentUrl}
              alt="변경할 프로필"
            />
          </Row>
          <label htmlFor="image_upload">
            <i
              className="fa-solid fa-camera"
              style={{ paddingRight: '10px', cursor: 'pointer' }}
            ></i>
          </label>
          <input
            type="file"
            id="image_upload"
            accept="image/*"
            onChange={changeHandler}
            style={{ display: "none", cursor: 'pointer' }}
          />
          <label htmlFor="set_default">
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </label>
          <input
            type="button"
            id="set_default"
            onClick={setDefaultHandler}
            style={{ display: "none" }}
          />
        </div>
        <Form onSubmit={handleSubmit}>
          <div
            className="text-muted"
            style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "0 0 10px 0" }}
          >
            <span className="material-icons" style={{ verticalAlign: "middle" }}>
              badge
            </span>{" "}
            이름
          </div>
          <div
            className="text-muted"
            style={{ fontSize: "12px", marginBottom: '10px' }}
          >
            당신의 이름을 설정해주세요!
          </div>
          {!isValidName && (
            <p style={{ fontSize: "11px", color: "red" }}>
              이름은 2글자 이상이어야 합니다.
            </p>
          )}
          <Form.Group
            controlId="userEditName"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="이름을 입력하세요"
              value={updateUser.name || ""}
              onChange={(e) => {
                if(e.target.value.length >= 2) {
                  setIsValidName(true);
                } else {
                  setIsValidName(false);
                }
                setUpdateUser({ ...updateUser, name: e.target.value });
              }}
            />
          </Form.Group>

          <div
            className="text-muted"
            style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "30px 0 10px 0" }}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              email
            </span>{" "}
            이메일
          </div>
          <div
            className="text-muted"
            style={{ fontSize: "12px", marginBottom: '10px' }}
          >
            이메일은 변경 불가능합니다!
          </div>
          <Form.Group
            controlId="userEmail"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder={user.email}
              disabled={true}
              className="mb-2"
            />
          </Form.Group>

          <div
            className="text-muted"
            style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "30px 0 10px 0" }}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              person_search
            </span>{" "}
            소개
          </div>
          <div
            className="text-muted"
            style={{ fontSize: "12px", marginBottom: '10px' }}
          >
            프로필은 다양한 사람들과 공유되고 있습니다.<br />
            자기 자신을 소개해주세요!
          </div>
          <Form.Group
            controlId="userEditDescription"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="소개를 입력하세요"
              value={updateUser.description || ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, description: e.target.value })
              }
            />
          </Form.Group>

          <div
            className="text-muted"
            style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "30px 0 10px 0" }}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              computer
            </span>{" "}
            직무
          </div>
          <div
            className="text-muted"
            style={{ fontSize: "12px", marginBottom: '10px' }}
          >
            이곳에는 다양한 관심사를 가진 사람들이 모여있습니다.<br />
            당신이 가장 관심 있는 직무를 선택해주세요!
          </div>
          <Form.Group
            controlId="userEditJob"
            className="mb-3"
          >
            <Form.Select
              onChange={(e) =>
                setUpdateUser({ ...updateUser, job: e.target.value })
              }
              value={updateUser.job || ""}
            >
              <option value="">관심 직무를 선택해주세요.</option>
              <option value="프론트엔드">프론트엔드</option>
              <option value="백엔드">백엔드</option>
              <option value="데이터 분석">데이터 분석</option>
              <option value="AI">AI</option>
              <option value="기타">기타</option>
            </Form.Select>
          </Form.Group>

          <div
            className="text-muted"
            style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "30px 0 10px 0" }}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              share
            </span>{" "}
            소셜 링크
          </div>
          <div
            className="text-muted"
            style={{ fontSize: "12px", marginBottom: '10px' }}
          >
            깃헙, 인스타그램 또는 유튜브를 운영중이신가요?<br />
            기존 사용중인 플랫폼 링크를 추가하세요!
          </div>
          <Form.Group
            controlId="userEditSocialLinkGitHub"
            className="mb-3"
            >
            <Form.Control
              type="text"
              placeholder="GitHub 주소를 입력하세요"
              value={updateUser.github || ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, github: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            controlId="userEditSocialLinkGitLab"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="GitLab 주소를 입력하세요"
              className="mb-2"
              value={updateUser.gitlab || ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, gitlab: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            controlId="userEditSocialLinkTwitter"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Twitter 주소를 입력하세요"
              className="mb-2"
              value={updateUser.twitter || ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, twitter: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            controlId="userEditSocialLinkInstagram"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Instagram 주소를 입력하세요"
              className="mb-2"
              value={updateUser.instagram || ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, instagram: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group
            controlId="userEditSocialLinkYoutube"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Youtube 주소를 입력하세요"
              className="mb-2"
              value={updateUser.youtube || ""}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, youtube: e.target.value })
              }
            />
          </Form.Group>

          <div
            className="text-muted"
            style={{ borderBottom: "rgba(70, 65, 65, 0.2) solid thin", margin: "30px 0 10px 0" }}
          >
            <span
              className="material-icons"
              style={{ verticalAlign: "middle" }}
            >
              lock
            </span>{" "}
            비밀번호
          </div>
          <div
            className="text-muted"
            style={{ fontSize: "12px", marginBottom: '10px' }}
          >
            비밀번호도 변경 가능합니다!
          </div>
          {!isValidPassword && (
            <p style={{ fontSize: "11px", color: "red" }}>
              비밀번호는 4글자 이상이어야 합니다.
            </p>
          )}
          <Form.Group
            controlId="checkPassword"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"
              className="mb-2"
              onChange={(e) => {
                if (e.target.value.length >= 4) {
                  setIsValidPassword(true);
                } else {
                  setIsValidPassword(false);
                }
                setNewPassword(e.target.value);
              }}
            />
          </Form.Group>
          <div
            className="text-muted"
            style={{ marginBottom: "10px", fontSize: "12px" }}
          >
            비밀번호 재확인
          </div>
          {isValidPassword && !isCorrectPassword && (
            <p style={{ fontSize: "11px", color: "red" }}>
              비밀번호가 일치하지 않습니다.
            </p>
          )}
          <Form.Group
            controlId="userEditPassword"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="비밀번호를 다시 한번 입력하세요"
              className="mb-2"
              onChange={(e) => {
                if (newPassword === e.target.value) {
                  setIsCorrectPassword(true);
                } else {
                  setIsCorrectPassword(false);
                }
              }}
              disabled={!isValidPassword}
            />
          </Form.Group>

          <Form.Group
            as={Row}
            className="mt-3 text-center"
          >
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                className="me-3"
                disabled={(!isCorrectPassword && newPassword) || !isValidName}
              >
                설정 저장
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
