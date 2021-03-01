import { render, screen } from "@testing-library/react";
import Questionnaire from "./Questionnaire";

import { useRouter } from "next/router";
import { updateUser } from "../utils/user.js";
import { UserContext } from "../contexts/UserContext.js";

jest.mock("next/router");
jest.mock("../utils/user");
jest.mock("../contexts/UserContext");


it("works", () => {
    expect(2).toBe(2);
});