# Capstone Project

## Dataset

You will visualize the [AHRQ’s Social Determinants of Health (SDOH) Database (Beta Version)](https://www.ahrq.gov/sdoh/data-analytics/sdoh-data.html).

These files contain the beta version of AHRQ’s database on Social Determinants of Health (SDOH), which was created under a project funded by the Patient Centered Outcomes Research (PCOR) Trust Fund. The purpose of this project is to create easy to use, easily linkable SDOH-focused data to use in PCOR research, inform approaches to address emerging health issues, and ultimately contribute to improved health outcomes.

- There is one excel file per year and each row represents a county.
- [Data source documentation](https://www.ahrq.gov/sites/default/files/wysiwyg/sdohchallenge/data/sdoh_data_file_documentation.pdf) can be accessed to look up variables definitions and dataset methodology.
- There is a Variable Cookbook excel file on the SDOH webpage that provides description statistics (mean, standard deviation, etc.) for each SDOH variable by year.

## Focus on a narrative

As you explore the data and decide the story you’d like to tell, write down statements you’re going to demonstrate with your visualization in [active voice](https://developers.google.com/tech-writing/one/active-voice).

Ex. In 2022, Essex County in Massachusetts had the most [roast beef sandwich](https://en.wikipedia.org/wiki/Roast_beef_sandwich) shops in the country.

At the beginning, please add constraints as to the types of data relationships to visualize. For example, you may decide you only want to look at a specific health outcome for a single state across multiple years or vice versa. Doing so will allow to spend less time sifting through data views (there are >280 columns of data) and more time crafting an interesting story with the constraints you’ve put on yourself. **The first constraint should be a health outcome (or set of related health outcomes) you’d like to examine.**

After you’ve reviewed the data, narrow down your statements to three that connect with one another to create a cohesive narrative. The three statements should guide your design thinking process when identifying which chart types to use and how the visualizations' data and visual elements connect with one another.

## Exploring the data

To craft your narrative statements, first you have to understand the data you’re working with. To facilitate data exploration and gather insights, we'd recommend visualizing some of the data with:

- [Excel charts](https://support.microsoft.com/en-us/office/create-a-chart-with-recommended-charts-cd131b77-79c7-4537-a438-8db20cea84c0#:~:text=Excel%20will%20analyze%20your%20data%20and%20make%20suggestions%20for%20you.&text=Select%20the%20data%20you%20want,how%20your%20data%20will%20look.)
- [Observable](https://observablehq.com/)
- [RawGraphs](https://www.rawgraphs.io/)
- [Flourish](https://flourish.studio/features/)

## Places to take inspiration from

1. The [Community Connector app](https://communityconnector.mathematica.org/) was designed and developed at Mathematica as any entry to [Visualization of Community-Level Social Determinants of Health Challenge](https://www.ahrq.gov/challenges/past/sdoh/index.html).
2. AHRQ developed a [dashboard](https://www.ahrq.gov/sdoh/data-analytics/sdoh-tech-poverty.html) that visualizes Poverty and Access to Internet, by County.

#About

- What research questions does your data visualization tool seek to answer?

1. What is the correlation, if any, between SDOHs including poverty status, medicaid-eligible, and rural populations, and the access to mental health care, including MH providers and MH facilities.  

- Who is the end-user for the data visualization and what are their research needs?

Public health researchers and public policy officials. There should be 

- How did you identify which metrics from the data set to use in the tool?

- What design decisions did you make when prototyping the tool?

- How did you choose the tool’s format (exploratory and/or narrative), chart types, and user interactions? How do they support the goal of the data visualization tool?

- If there was intention behind the hierarchy of information and layout, colors used, etc. please speak to those as well.

- After visualizing the data, did you discover any interesting patterns or characteristics of the data?

- How would you test your data visualization tool for quality control? What would be automated and what would be manual QA?
