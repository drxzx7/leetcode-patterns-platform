# Counting Bits - Python Solution
# Counting Bits - Optimal Python Solution (Greedy & Bit Manipulation)
from typing import List, Dict, Optional

class Solution:
    def countingbits(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Greedy & Bit Manipulation traversal
        for num in nums:
            result += num
            
        return result
