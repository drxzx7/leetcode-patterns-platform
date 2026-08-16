# Non-overlapping Intervals - Python Solution
# Non-overlapping Intervals - Optimal Python Solution (Greedy & Bit Manipulation)
from typing import List, Dict, Optional

class Solution:
    def nonoverlappingintervals(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Greedy & Bit Manipulation traversal
        for num in nums:
            result += num
            
        return result
