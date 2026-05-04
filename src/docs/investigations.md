# Overview

Investigation Module provides services for printing and tracking reports. 

![Investigation module](/src/assets/images/inv-overview.png)

# Result Report Printing

## Fetching Reports

![Result report printing](/src/assets/images/inv-rrp.png)

All the reported investigations can be fetched by entering the PIN of the patient.

## Selection

![Listed reports](/src/assets/images/inv-rrp-list.png)

Reported investigations can be selected using the **checkboxes**. If you want to select all the investigations shown, select the checkbox next to the table header.

## Sorting and Filtering

Reports can be filtered by department, lab, IP/OP or test.
Searching for a specific test is also possible.

## Printing

![Printing](/src/assets/images/inv-rrp-print.png)

Once the needed reported are selected, scroll down and click the **"Print"** button.
The generated reports are opened which can then be saved or printed as needed.

# Lab HTML Report Printing

This is similar to the previous one, but reports can be printed as soon as they are reported. No need to wait till validation.

# Investigation Tracking Report

This service is used for tracking the status of all the investigations ordered, collected and reported.
All the investigations from the last 3 months are listed test wise and can be viewed as graphs.

![Investigation tracking](/src/assets/images/inv-tracking.png)

![Investigation graph](/src/assets/images/inv-tracking-1.png)

The graph plots all the values in Y axis and dates in X axis.
Entries with date but no values implies that the investigation is pending.

Thus, the pending status of an investigation can be identified by entries with date and no values.

![Pending report](/src/assets/images/inv-tracking-2.png)

> [!NOTE]
> Radiological investigation reporting is being rolled out in phase.

