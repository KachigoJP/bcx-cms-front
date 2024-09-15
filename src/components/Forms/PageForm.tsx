import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Image from "react-bootstrap/Image";

// Source
import * as Helpers from "helpers/functions";
import { PageFormProps } from "helpers/interfaces";
import { useApi } from "helpers/api";
import { API } from "helpers/constants";
import { TextEditor } from "components/Components/TextEditor";
import DefaultImg from "assets/img/default.jpg";

const PageForm: React.FC<PageFormProps> = (props) => {
  const { hookForm, data } = props;

  const { t, i18n } = useTranslation();
  const editorRef = React.useRef(null);
  const [image, setImage] = React.useState(data?.photo);

  const { errors } = hookForm.formState;

  // APIs
  const { state: stateOption, sendRequest: sendGetOption } = useApi();

  React.useEffect(() => {
    if (!stateOption.data) {
      sendGetOption({
        method: "get",
        url: API.PAGES_OPTIONS,
      });
    }
    return () => {};
  }, []);

  React.useEffect(() => {
    setImage(data?.photo);
  }, [data]);

  React.useEffect(() => {
    const subscription = hookForm.watch((value, { name, type }) => {
      if (name == "title" && value.title) {
        hookForm.setValue("slug", Helpers.generateSlug(value.title));
      } else if (name == "photo") {
        setImage(value.photo);
      }
    });

    return () => subscription.unsubscribe();
  }, [hookForm.watch]);

  const optionData = stateOption?.data?.data?.data;

  const onEditorChange = (newValue: string) => {
    hookForm.setValue("content", newValue);
  };

  return (
    <React.Fragment>
      <Row>
        <Col sm={7}>
          <Row className="mb-3">
            <Col>
              <Form.Label className="col-md-3 col-form-label">
                {t("Title")}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={data?.title}
                {...hookForm.register("title")}
              />
              <Form.Text className="text-danger">
                {errors.title?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="col-md-3 col-form-label">
                {t("Content")}
              </Form.Label>
              <TextEditor
                onInit={(_evt: any, editor: any) =>
                  (editorRef.current = editor)
                }
                onEditorChange={onEditorChange}
                initialValue={data?.content}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "anchor",
                    "autolink",
                    "help",
                    "image",
                    "link",
                    "lists",
                    "searchreplace",
                    "table",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "image | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <Form.Text className="text-danger">
                {errors.content?.message}
              </Form.Text>
            </Col>
          </Row>
        </Col>

        <Col sm={5}>
          <Row className="mb-3">
            <Col>
              <Form.Label className="col-md-3 col-form-label">
                {t("Slug")}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={data?.slug}
                {...hookForm.register("slug")}
              />
              <Form.Text className="text-danger">
                {errors.slug?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="col-md-3 col-form-label">
                {t("Photo")}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={data?.photo}
                {...hookForm.register("photo")}
              />
              <Form.Text className="text-danger">
                {errors.photo?.message}
              </Form.Text>
              <Image
                src={image || DefaultImg}
                rounded
                width="50%"
                className="mt-3"
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="col-md-3 col-form-label">
                {t("Categories")}
              </Form.Label>
              <Form.Control
                as="select"
                defaultValue={data?.category?.id}
                {...hookForm.register("category")}
              >
                <option>{t("Please select")}</option>
                {optionData?.categories?.map((item: any, idx: number) => {
                  return (
                    <option
                      key={idx}
                      value={item.value}
                      // selected={item.value == data?.category?.id}
                    >
                      {item.label}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Text className="text-danger">
                {errors.status?.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label className="col-md-3 col-form-label">
                {t("Tags")}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={data?.tags}
                {...hookForm.register("tags")}
              />
              <Form.Text className="text-danger">
                {errors.status?.message}
              </Form.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PageForm;
