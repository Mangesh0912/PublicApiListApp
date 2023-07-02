import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PublicApiComponent from "../components/PublicApiComponent";
import { act } from "react-dom/test-utils";

describe("PublicApiInifiniteScrollGrid", () => {
  test("renders grid items", async () => {
    //Mock the function and return sample response
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        count: 2,
        entries: [
          {
            API: "AdoptAPet",
            Description: "Resource to help get pets adopted",
            Auth: "apiKey",
            HTTPS: true,
            Cors: "yes",
            Link: "https://www.adoptapet.com/public/apis/pet_list.html",
            Category: "Animals",
          },
          {
            API: "Axolotl",
            Description: "Collection of axolotl pictures and facts",
            Auth: "",
            HTTPS: true,
            Cors: "no",
            Link: "https://theaxolotlapi.netlify.app/",
            Category: "Animals",
          },
        ],
      }),
    });

    render(<PublicApiComponent />);

    await waitFor(() => {
      //Assert that grid items are rendered.
      expect(screen.getByText("AdoptAPet")).toBeInTheDocument();
    });
  });

  test("fetch more data on scroll", async () => {
    const entries = [];
    // puplate data set 1
    for (let i = 0; i < 50; i++) {
      entries.push({
        API: "AdoptAPet" + i,
        Description: "Resource to help get pets adopted",
        Auth: "apiKey",
        HTTPS: true,
        Cors: "yes",
        Link: "https://www.adoptapet.com/public/apis/pet_list.html",
        Category: "Animals",
      });
    }

    // puplate data set 2
    for (let i = 0; i < 50; i++) {
      entries.push({
        API: "Axolotl" + i,
        Description: "Collection of axolotl pictures and facts",
        Auth: "",
        HTTPS: true,
        Cors: "no",
        Link: "https://theaxolotlapi.netlify.app/",
        Category: "Animals",
      });
    }

    const mockData = {
      count: 100,
      entries: entries,
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockData) });

    render(<PublicApiComponent />);
    // Wait for the initial data to be rendered
    await waitFor(() => {
        expect(screen.getByText("AdoptAPet0")).toBeInTheDocument()
        
    })

    //scroll to the bottom
    window.innerHeight = 600;
    document.documentElement.scrollTop = 1000;
    window.dispatchEvent(new Event("scroll"));

    // Check for more data to be loaded when scroll hits the bottom
    await waitFor(() => {
        expect(screen.getByText("Axolotl0")).toBeInTheDocument()
    })
   
  });
});
