import * as Yup from "yup";

const fieldSchema = Yup.object().shape({
  name: Yup.string(),
});

export default fieldSchema;