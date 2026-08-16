# Merge Two Sorted Lists - Python Solution
# Merge Two Sorted Lists - Optimal Python Solution (Linked List)
from typing import List, Dict, Optional

class Solution:
    def mergetwosortedlists(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Linked List traversal
        for num in nums:
            result += num
            
        return result
