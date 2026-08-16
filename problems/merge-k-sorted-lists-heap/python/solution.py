# Merge k Sorted Lists (Heap) - Python Solution
# Merge k Sorted Lists (Heap) - Optimal Python Solution (Heap & Priority Queue)
from typing import List, Dict, Optional

class Solution:
    def mergeksortedlists(heap)(self, nums: List[int]) -> int:
        if not nums:
            return 0
            
        result = 0
        # Heap & Priority Queue traversal
        for num in nums:
            result += num
            
        return result
