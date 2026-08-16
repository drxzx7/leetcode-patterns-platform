# Remove Nth Node From End of List - Python Solution
# Remove Nth Node From End of List - Optimal Python Solution (Linked List)
from typing import List, Dict, Optional

class Solution:
    def removenthnodefromendoflist(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Linked List traversal
        for num in nums:
            result += num
            
        return result
