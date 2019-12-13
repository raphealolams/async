# Instructions

1. this exercise calls you to write some async flow-control code. To start off with, you'll use promises only

2. Expected Behavior
    - Request all 3 files at the same time (in 'parallel')
    - Render them ASAP (don't just bindly wait for all of them to finish loading)
    - But render them in a proper (obvious) order: 'file1', 'file2', 'file2'
    - After all 3 are done, output 'Complete!'