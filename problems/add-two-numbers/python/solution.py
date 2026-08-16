# Add Two Numbers - Python Solution
# Add Two Numbers - Optimal Python Solution (Linked List)
from typing import List, Dict, Optional

class Solution:
    def addtwonumbers(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Linked List traversal
        for num in nums:
            result += num
            
        return result
